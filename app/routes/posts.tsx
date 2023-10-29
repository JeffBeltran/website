import { Link, Outlet } from "@remix-run/react";

import { Layout } from "~/components/layout";

export default function PostLayout() {
  return (
    <div>
      <nav className="bg-yellow-300">
        <Layout>
          <div className="py-4 font-mono">
            <Link to="/" className="hover:text-stone-700">
              <p className="text-lg font-semibold">Jeff Beltran</p>
              <p className="text-xs">
                Coding by day, entrepreneuring by night.
              </p>
            </Link>
          </div>
        </Layout>
      </nav>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}
