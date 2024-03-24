"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { uploadImage } from "@/modules/story/actions/uploadImage";

type Props = {
  imageUrl: string;
  file: File;
  saveStory: () => void;
};

export const ImageInsert = ({ imageUrl, file, saveStory }: Props) => {
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(imageUrl);
  const updateImageUrl = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await uploadImage(formData).then((SecureImageUrl) =>
        setCurrentImageUrl(SecureImageUrl)
      );
    } catch (error) {
      toast.error("Error uploading the image");
    }
  };

  useEffect(() => {
    updateImageUrl().then(() => {
      saveStory();
    });
  }, [imageUrl]);
  return (
    <div className="py-8">
      <div>
        <Image
          src={currentImageUrl}
          alt="Image"
          className="aspect-video object-cover"
          width={800}
          height={450}
        />
        <div className="text-center text-sm max-w-md mx-auto">
          <p data-p-placeholder="Type caption for your image"></p>
        </div>
      </div>
      <p data-p-placeholder="Continue writing..."></p>
    </div>
  );
};
