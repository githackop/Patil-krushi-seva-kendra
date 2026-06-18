"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/forms/product-form";

import { Plus } from "lucide-react";

export default function AddProductDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-12 rounded-2xl bg-green-700 px-6 hover:bg-green-800">
                    <Plus className="mr-2 h-5 w-5" />
                    Add New Product
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] max-w-2xl gap-0 overflow-hidden p-0 sm:max-w-2xl">
                <DialogHeader className="border-b border-slate-100 px-6 py-5">
                    <DialogTitle className="text-xl font-semibold text-slate-900">
                        Add New Product
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the details below to add a product to your store.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[calc(90vh-8rem)]">
                    <div className="px-6 py-5">
                        {open && <ProductForm onSuccess={() => setOpen(false)} />}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
