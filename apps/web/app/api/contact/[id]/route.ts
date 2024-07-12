import { NextResponse } from 'next/server';
import { apiClient } from '~/client/index';

export const PATCH = async (request: Request) => {
  const body = await request.json();
  try {
    const user = await apiClient.updateContact({ ...body });
    return NextResponse.json({ body, user, message: 'Update successful' });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error, message: 'failed to update' }), {
      status: 400,
    });
  }
};

export type ApiError = {
  message: string;
  extensions: {
    code: string;
    path: string[];
  };
};

export type ResponseError = {
  message: string;
  path: string[];
};
