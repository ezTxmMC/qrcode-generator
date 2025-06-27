import QRCode from "qrcode";
import { createCanvas, loadImage } from "canvas";
import PromptSync from "prompt-sync";

class QRCodeGenerator {
  private output: string;
  private options: Record<string, any>;
  private logoPath?: string;

  constructor(output: string, options: Record<string, any>, logoPath?: string) {
    this.output = output;
    this.options = options;
    this.logoPath = logoPath;
  }

  async generate(): Promise<string> {
    try {
      const url = await QRCode.toDataURL(this.output, this.options);
      return url;
    } catch (error) {
      console.error("Error generating QR code:", error);
      throw error;
    }
  }
}

const main = async () => {
  const prompt = PromptSync();
  let text = null;
  while (text === null) {
    text = prompt("Was soll der QR-Code ausgeben? ");
  }
  const options = {
    errorCorrectionLevel: "QUARTILE",
    type: "image/png",
    quality: 0.3,
    margin: 1,
    colors: {
      dark: "#005fffff",
      light: "#33ffffff",
    },
  };
  try {
    const qrCodeUrl = await new QRCodeGenerator(text, options).generate();
    console.log("QR Code URL:", qrCodeUrl);
  } catch (error) {
    console.error("Failed to generate QR code:", error);
  }
};

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
});
