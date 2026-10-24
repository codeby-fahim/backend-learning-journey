"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const DeleteUserButton = ({ userId, userName }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")

  const handleDelete = async () => {
    setIsDeleting(true)
    setError("")

    try {
      const res = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
      })
      const result = await res.json()

      if (!res.ok || result.deletedCount === 0) {
        throw new Error("The user could not be deleted. Please try again.")
      }

      router.push("/users")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
      setIsDeleting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="destructive">
            <Trash />
            Delete
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete this user?</DialogTitle>
          <DialogDescription>
            This permanently removes{" "}
            <span className="font-medium text-foreground">{userName}</span>{" "}
            from the database. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash />
                Delete user
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteUserButton
