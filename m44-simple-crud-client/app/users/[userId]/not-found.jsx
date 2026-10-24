import Link from "next/link"
import { ArrowLeft, UserX } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

export default function UserNotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-5 text-center">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-background text-muted-foreground shadow-sm ring-1 ring-foreground/10">
          <UserX className="size-7" />
        </span>

        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">
            User not found
          </h1>
          <p className="text-sm text-muted-foreground">
            This profile may have been deleted, or the link is incorrect.
          </p>
        </div>

        <Link
          href="/users"
          className={buttonVariants({ variant: "outline" })}
        >
          <ArrowLeft />
          Back to all users
        </Link>
      </div>
    </main>
  )
}
