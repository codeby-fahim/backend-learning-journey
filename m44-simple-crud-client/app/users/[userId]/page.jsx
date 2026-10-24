import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, FingerprintPattern, Mail } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import DeleteUserButton from "@/components/DeleteUserButton"
import UpdateUserDialog from "@/components/UpdateUserDialog"

export const metadata = {
  title: "User profile",
}

const getInitials = (name = "") => {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")

  return initials.toUpperCase() || "U"
}

const DetailRow = ({ icon: Icon, label, value, mono = false }) => (
  <div className="flex min-w-0 items-start gap-3 rounded-xl bg-muted/40 p-4 ring-1 ring-foreground/5">
    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground ring-1 ring-foreground/10">
      <Icon className="size-4" />
    </span>
    <div className="min-w-0">
      <dt className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
        {label}
      </dt>
      <dd
        className={`mt-1 truncate text-sm font-medium ${mono ? "font-mono text-xs" : ""}`}
      >
        {value}
      </dd>
    </div>
  </div>
)

const UserDetailPage = async ({ params }) => {
  const { userId } = await params
  const res = await fetch(`http://localhost:5000/users/${userId}`)

  if (!res.ok) {
    notFound()
  }

  const user = await res.json().catch(() => null)

  if (!user?._id) {
    notFound()
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-muted/30 px-4 py-8 sm:px-6 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-120 -translate-x-1/2 rounded-full bg-foreground/4 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/users"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft />
            All users
          </Link>
          <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            User profile
          </span>
        </div>

        <Card className="gap-0 border-0 pt-0 shadow-xl shadow-foreground/5 ring-1 ring-foreground/10">
          <div className="relative h-36 overflow-hidden bg-linear-to-br from-muted via-muted/60 to-background sm:h-40">
            <div
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div
              aria-hidden
              className="absolute -top-20 right-0 size-56 rounded-full bg-foreground/5 blur-2xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 left-8 size-52 rounded-full bg-foreground/3 blur-3xl"
            />
          </div>

          <CardContent className="relative -mt-16">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex min-w-0 items-end gap-4">
                <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-foreground text-2xl font-semibold tracking-tight text-background shadow-lg ring-4 ring-card">
                  {getInitials(user.name)}
                </div>
                <div className="min-w-0 pb-1">
                  <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                    {user.name}
                  </h1>
                  <p className="truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pb-1">
                <UpdateUserDialog user={user} triggerClassName="" />
                <DeleteUserButton userId={user._id} userName={user.name} />
              </div>
            </div>
          </CardContent>

          <CardContent className="pt-6">
            <dl className="grid gap-3 sm:grid-cols-2">
              <DetailRow
                icon={Mail}
                label="Email address"
                value={user.email}
              />
              <DetailRow
                icon={FingerprintPattern}
                label="User ID"
                value={user._id}
                mono
              />
            </dl>
          </CardContent>

          <CardFooter className="justify-between gap-3 bg-muted/40">
            <p className="text-xs text-muted-foreground">
              Record{" "}
              <span className="font-mono">#{user._id.slice(-6)}</span>
            </p>
            <Link
              href="/users"
              className="text-xs font-medium underline-offset-4 hover:underline"
            >
              Browse all users
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

export default UserDetailPage
