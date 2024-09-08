import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 h-auto mb-0 py-8">
      <div className="container mx-auto mb-0 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; 2024 EquiTaxAI. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link className="text-sm text-gray-600 hover:text-primary" href="#">
              Privacy Policy
            </Link>
            <Link className="text-sm text-gray-600 hover:text-primary" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm text-gray-600 hover:text-primary" href="#">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
