import axios from "axios";
import React from "react";

export function getBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      typeof reader.result === "string"
        ? resolve(reader.result)
        : reject('"Unexpected type received from FileReader"');
    reader.onerror = (error) => reject(error);
  });
}
