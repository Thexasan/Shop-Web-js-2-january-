const config = {
  BASIC_API: "http://localhost:8080",
  fileTobase64(file)
  {
      return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = (error) => reject(error)
      })
  },
};

export const { BASIC_API, fileTobase64 } = config;
