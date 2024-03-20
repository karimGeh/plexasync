import fromBinaryStringFloat from "@stdlib/number-float32-base-from-binary-string";

export const binaryStringToFloat = (binaryString: string) => {
  // if (binaryString.length !== 32) {
  //   throw new Error("Binary string must be exactly 32 characters long.");
  // }

  // // Convert binary string to a number
  // const num = parseInt(binaryString, 2);

  // // Create a buffer that can hold 4 bytes (32 bits)
  // const buffer = new ArrayBuffer(4);

  // // Create a view to manipulate integers in the buffer
  // const viewUintx  32 = new Uint32Array(buffer);
  // viewUint32[0] = num;

  // // Create a view to read a float from the buffer
  // const viewFloat32 = new Float32Array(buffer);

  // // Return the first float from the buffer
  // return viewFloat32[0];
  try {
    const value = fromBinaryStringFloat(binaryString.padStart(32, "0"));
    console.log("====================================");
    console.log(binaryString, value);
    console.log("====================================");
    return parseFloat(value.toFixed(6));
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return 0;
  }
};
