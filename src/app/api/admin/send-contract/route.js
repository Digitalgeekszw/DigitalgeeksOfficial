import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import connectDB from '../../../../lib/mongodb';
import JobApplication from '../../../../models/JobApplication';
import { sendAcceptanceContractEmail, sendManualContractEmail } from '../../../../utils/email';
import { uploadToR2 } from '../../../../utils/r2';

export async function POST(req) {
  try {
    await connectDB();

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      // ── Manual PDF contract ──────────────────────────────────────────────
      const formData = await req.formData();
      const id = formData.get('id');
      const file = formData.get('file');

      if (!id || !file) {
        return NextResponse.json({ message: 'id and file are required.' }, { status: 400 });
      }

      if (file.type !== 'application/pdf') {
        return NextResponse.json({ message: 'Only PDF files are accepted.' }, { status: 400 });
      }

      const application = await JobApplication.findById(id);
      if (!application) {
        return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const fileUrl = await uploadToR2(buffer, file.name, file.type, 'contracts');

      application.status = 'Hired';
      application.acceptanceContract = {
        type: 'manual',
        token: null,
        sentAt: new Date(),
        adminName: '',
        adminTitle: '',
        adminDate: null,
        candidateSignedName: '',
        candidateSignedAt: null,
        candidateAccepted: false,
        fileUrl,
        fileName: file.name,
      };

      await application.save();

      try {
        await sendManualContractEmail({
          firstName: application.firstName,
          lastName: application.lastName,
          email: application.email,
          jobTitle: application.jobTitle,
          fileBuffer: buffer,
          fileName: file.name,
        });
      } catch (emailError) {
        console.error('Failed to send manual contract email:', emailError.message);
        return NextResponse.json(
          { message: 'Contract saved, but failed to send email.', error: emailError.message },
          { status: 502 }
        );
      }

      return NextResponse.json({ message: 'Contract sent successfully.' }, { status: 200 });
    }

    // ── System-generated contract ──────────────────────────────────────────
    const body = await req.json();
    const { id, adminName, adminTitle, adminDate } = body;

    if (!id || !adminName || !adminTitle || !adminDate) {
      return NextResponse.json(
        { message: 'id, adminName, adminTitle and adminDate are required.' },
        { status: 400 }
      );
    }

    const application = await JobApplication.findById(id);
    if (!application) {
      return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
    }

    const token = randomUUID();
    const signedDate = new Date(adminDate);

    application.status = 'Hired';
    application.acceptanceContract = {
      type: 'generated',
      token,
      sentAt: new Date(),
      adminName: adminName.trim(),
      adminTitle: adminTitle.trim(),
      adminDate: signedDate,
      candidateSignedName: '',
      candidateSignedAt: null,
      candidateAccepted: false,
      fileUrl: '',
      fileName: '',
    };

    await application.save();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://digitalgeeks.tech';
    const signingLink = `${appUrl}/contract/accept/${token}`;

    try {
      await sendAcceptanceContractEmail({
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        jobTitle: application.jobTitle,
        signingLink,
        adminName: application.acceptanceContract.adminName,
        adminTitle: application.acceptanceContract.adminTitle,
        adminDate: application.acceptanceContract.adminDate,
      });
    } catch (emailError) {
      console.error('Failed to send acceptance contract email:', emailError.message);
      return NextResponse.json(
        { message: 'Contract saved, but failed to send email.', error: emailError.message },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: 'Acceptance contract sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Admin Send Contract Error:', error);
    return NextResponse.json(
      { message: 'Failed to send contract.', error: error.message },
      { status: 500 }
    );
  }
}
