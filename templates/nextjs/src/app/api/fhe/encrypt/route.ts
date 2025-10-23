import { NextRequest, NextResponse } from 'next/server';

/**
 * API route for encrypting data using FHEVM
 * This is a server-side endpoint for encryption operations
 */
export async function POST(request: NextRequest) {
  try {
    const { value, type } = await request.json();

    if (!value || !type) {
      return NextResponse.json(
        { error: 'Missing value or type parameter' },
        { status: 400 }
      );
    }

    // Note: Actual encryption typically happens client-side with fhevmjs
    // This endpoint can be used for server-side validation or logging
    return NextResponse.json({
      success: true,
      message: 'Encryption request received',
      data: {
        value,
        type,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Encryption API error:', error);
    return NextResponse.json(
      { error: 'Encryption failed' },
      { status: 500 }
    );
  }
}
