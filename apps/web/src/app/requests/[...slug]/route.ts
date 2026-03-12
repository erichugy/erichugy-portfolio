import { type NextRequest, NextResponse } from "next/server";

import { captureFromNextRequest } from "@/tools/request-bin/adapter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ slug: string[] }> };

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

async function handle(
  request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  const { slug } = await params;
  const path = "/requests/" + slug.join("/");
  const captured = await captureFromNextRequest(request, path);
  return NextResponse.json(
    { message: "Request captured", id: captured.id, timestamp: captured.timestamp },
    { headers: corsHeaders },
  );
}

export async function GET(request: NextRequest, ctx: RouteParams): Promise<NextResponse> {
  return handle(request, ctx);
}
export async function POST(request: NextRequest, ctx: RouteParams): Promise<NextResponse> {
  return handle(request, ctx);
}
export async function PUT(request: NextRequest, ctx: RouteParams): Promise<NextResponse> {
  return handle(request, ctx);
}
export async function DELETE(request: NextRequest, ctx: RouteParams): Promise<NextResponse> {
  return handle(request, ctx);
}
export async function PATCH(request: NextRequest, ctx: RouteParams): Promise<NextResponse> {
  return handle(request, ctx);
}
export async function HEAD(request: NextRequest, ctx: RouteParams): Promise<NextResponse> {
  return handle(request, ctx);
}
export async function OPTIONS(_request: NextRequest, _ctx: RouteParams): Promise<NextResponse> {
  // NOTE: CORS preflight should return 204 with headers only, no body
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
