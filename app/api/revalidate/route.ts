// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"


export async function POST(req: Request) {
  const { path } = await req.json()
  revalidatePath(path)
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
