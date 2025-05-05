import { MessageSquare } from "lucide-react"
import { Link } from "react-router";
import logo from "../assets/mavi-logo.png";

export function PageHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} className="h-12 w-full"></img>
          </div>
        </div>
      </div>
    </header>
  )
}
