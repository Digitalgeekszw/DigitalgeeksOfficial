import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb';
import JobApplication from '../../../../../models/JobApplication';

export async function GET(_, { params }) {
  try {
    await connectDB();
    const { token } = params;

    const application = await JobApplication.findOne({ 'acceptanceContract.token': token });
    if (!application) {
      return NextResponse.json({ message: 'Invalid or expired contract link.' }, { status: 404 });
    }

    return NextResponse.json({
      application: {
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        jobTitle: application.jobTitle,
      },
      acceptanceContract: {
        adminName: application.acceptanceContract?.adminName || '',
        adminTitle: application.acceptanceContract?.adminTitle || '',
        adminDate: application.acceptanceContract?.adminDate || null,
        candidateAccepted: application.acceptanceContract?.candidateAccepted || false,
        candidateSignedName: application.acceptanceContract?.candidateSignedName || '',
        candidateSignedAt: application.acceptanceContract?.candidateSignedAt || null,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Contract Accept GET Error:', error);
    return NextResponse.json({ message: 'Failed to load contract.', error: error.message }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    await connectDB();
    const { token } = params;
    const body = await req.json();
    const { candidateSignedName } = body;

    if (!candidateSignedName || !candidateSignedName.trim()) {
      return NextResponse.json({ message: 'Candidate signed name is required.' }, { status: 400 });
    }

    const application = await JobApplication.findOne({ 'acceptanceContract.token': token });
    if (!application) {
      return NextResponse.json({ message: 'Invalid or expired contract link.' }, { status: 404 });
    }

    application.acceptanceContract.candidateAccepted = true;
    application.acceptanceContract.candidateSignedName = candidateSignedName.trim();
    application.acceptanceContract.candidateSignedAt = new Date();

    await application.save();

    return NextResponse.json({ message: 'Contract signed successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Contract Accept POST Error:', error);
    return NextResponse.json({ message: 'Failed to sign contract.', error: error.message }, { status: 500 });
  }
}
