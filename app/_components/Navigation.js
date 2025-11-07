import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();

  const user = session?.user;

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li className="">
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors flex items-center gap-2">
            {user?.image && (
              <img src={user.image} className="h-7 rounded-full" />
            )}
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}
