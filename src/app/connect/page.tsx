// connect page user must be logged in
// user can find linkedin profiles with those who may like or want to help with the project etc.
// the user chooses a project
// then they can click find connections which calls openai api with search enabled with this prompt

import { redirect } from "next/navigation";
import LinkedinFinder from "./LinkedinFinder";
import { getUsersProducts } from "./actions";
import { createClient } from "@/lib/supabase/server";

export default async function Connect() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login");
  }
  const products = await getUsersProducts();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <LinkedinFinder
        project_links={products.map((product) => product.projectUrl)}
      />
    </div>
  );
}
