import { supabase } from "../../lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .from("favorite_colors")
    .select("*");

  return Response.json({ data, error });
}

export async function POST(request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("favorite_colors")
    .insert({
      name: body.name,
      color: body.color
    });

  return Response.json({ data, error });
}
