import QRCode from "qrcode";
import PromptSync from "prompt-sync";

const generateQRCode = async (
  text: string,
  options: Record<string, any>
): Promise<string> => {
  try {
    const url = QRCode.toDataURL(text, options);
    return url;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};

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
    const qrCodeUrl = await generateQRCode(text, options);
    console.log("QR Code URL:", qrCodeUrl);
  } catch (error) {
    console.error("Failed to generate QR code:", error);
  }
};

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
});
