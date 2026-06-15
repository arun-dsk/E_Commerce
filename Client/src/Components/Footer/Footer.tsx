import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-20 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3">
        {/* Left Section */}
        <div className="space-y-5">
          <Image
            src="/logo.svg"
            alt="logo"
            width={128}
            height={53}
            className="w-32"
          />

          <p className="text-sm leading-7 text-slate-300">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry&apos;s
            standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="mb-5 text-xl font-semibold">
            Links
          </h2>

          <ul className="space-y-3 text-slate-300">
            <li className="cursor-pointer hover:text-white">
              Home
            </li>

            <li className="cursor-pointer hover:text-white">
              About us
            </li>

            <li className="cursor-pointer hover:text-white">
              Categories
            </li>

            <li className="cursor-pointer hover:text-white">
              Contact Us
            </li>

            <li className="cursor-pointer hover:text-white">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="mb-5 text-xl font-semibold">
            Get in touch
          </h2>

          <div className="space-y-3 text-slate-300">
            <p>+91 7034016568</p>
            <p>pranavmn7034@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <p className="py-5 text-center text-sm text-slate-400">
          Copyright 2025 Pranavmn.dev. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
