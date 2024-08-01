
"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function Login() {
  return (
    <div className="min-h-screen items-center justify-center">
        <form className="flex max-w-3xl flex-col gap-4">
        <div className="mb-6 w-1/4">
            <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
        </div>
        <div className="mb-6 w-1/4">
            <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" required />
        </div>
        <Button type="submit">Submit</Button>
        </form>
    </div>
  );
}
