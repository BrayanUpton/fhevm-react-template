import { NextRequest, NextResponse } from 'next/server';

/**
 * API route for homomorphic computation operations
 * Demonstrates server-side coordination of FHE computations
 */
export async function POST(request: NextRequest) {
  try {
    const { operation, operands } = await request.json();

    if (!operation || !operands) {
      return NextResponse.json(
        { error: 'Missing operation or operands' },
        { status: 400 }
      );
    }

    // Validate operation type
    const validOperations = ['add', 'subtract', 'multiply', 'compare'];
    if (!validOperations.includes(operation)) {
      return NextResponse.json(
        { error: 'Invalid operation type' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Computation request received',
      data: {
        operation,
        operands,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Computation API error:', error);
    return NextResponse.json(
      { error: 'Computation failed' },
      { status: 500 }
    );
  }
}
