import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import connectDB from '../../../../lib/mongodb';
import JobApplication from '../../../../models/JobApplication';
import { sendAcceptanceContractEmail } from '../../../../utils/email';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, adminName, adminTitle, adminDate } = body;

    if (!id || !adminName || !adminTitle || !adminDate) {
      return NextResponse.json({ message: 'id, adminName, adminTitle and adminDate are required.' }, { status: 400 });
    }

    const application = await JobApplication.findById(id);
    if (!application) {
      return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
    }

    const token = randomUUID();
    const signedDate = new Date(adminDate);

    application.status = 'Hired';
    application.acceptanceContract = {
      token,
      sentAt: new Date(),
      adminName: adminName.trim(),
      adminTitle: adminTitle.trim(),
      adminDate: signedDate,
      candidateSignedName: '',
      candidateSignedAt: null,
      candidateAccepted: false,
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
      return NextResponse.json({ message: 'Contract saved, but failed to send email.', error: emailError.message }, { status: 502 });
    }

    return NextResponse.json({ message: 'Acceptance contract sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Admin Send Contract Error:', error);
    return NextResponse.json({ message: 'Failed to send acceptance contract.', error: error.message }, { status: 500 });
  }
}
