'use client'
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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"


const UpdateUserDialog = ({ user, triggerClassName = "mx-4" }) => {

  const handleUpdateUser= async(e)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updateUser = Object.fromEntries(formData.entries());

    const res = await fetch(`http://localhost:5000/users/${user._id}`, {
      method: 'PATCH',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateUser)
    })
    const result = await res.json();
    console.log('update user', result);
    if(result.modifiedCount > 0){
      console.log('Update user data successfully');
      redirect('/users')
    }
  }
  return (
    <div>
       <Dialog>
        <DialogTrigger render={<Button className={triggerClassName} variant="outline">Edit User</Button>} />
        <DialogContent className="sm:max-w-sm">
      <form onSubmit={handleUpdateUser}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" type="text" defaultValue={user.name} />
            </Field>
            <Field>
              <Label htmlFor="email-1">Email</Label>
              <Input id="email-1" name="email" type="email" defaultValue={user.email} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
    </div>
  );
};

export default UpdateUserDialog;