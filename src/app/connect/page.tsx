// connect page user must be logged in
// user can find linkedin profiles with those who may like or want to help with the project etc.
// the user chooses a project
// then they can click find connections which calls openai api with search enabled with this prompt

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAllProducts } from "@/lib/actions";

export default async function Connect() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login");
  }
  const allProducts = await getAllProducts();
  const linkedinConnections = allProducts
    .filter(
      (product) => product.linkedinUrl && product.linkedinUrl.trim() !== ""
    )
    .map((product) => ({
      title: product.title,
      linkedinUrl: product.linkedinUrl,
      description: product.shortDescription,
    }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 space-y-8">
      {/* Available LinkedIn Connections */}
      {linkedinConnections.length > 0 && (
        <div className="neo-card p-6">
          <h2 className="text-2xl font-bold text-gradient mb-6">
            Available LinkedIn Connections
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {linkedinConnections.map((connection, index) => (
              <div
                key={index}
                className="neo-card p-4 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-[var(--purdue-gold-dark)] mb-2 line-clamp-2">
                  <i>Creator of</i> {connection.title}
                </h3>
                {connection.description && (
                  <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                    {connection.description}
                  </p>
                )}
                <a
                  href={connection.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-[var(--purdue-gold-dark)] rounded-md hover:bg-[var(--purdue-gold)] transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* want your name here? */}
      <div className="neo-card p-6">
        <h2 className="text-2xl font-bold text-gradient mb-6">
          Want to be a helpful hand or a connection for a founder? Get your
          linkedin profile here!
        </h2>
        <p>
          Contact us at{" "}
          <a href="mailto:maddoxpublic@gmail.com">maddoxpublic@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
