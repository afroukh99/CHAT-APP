import axios from 'axios';





const upload =async (file)=> {
    const data = new FormData()
    console.log(import.meta.env.VITE_API_KEY)
    data.append('file', file)
    data.append("upload_preset","chatApp")
     data.append('api_key',import.meta.env.VITE_API_KEY)
    try {
      const res = await axios.post(`${import.meta.env.VITE_CLOUDINARY_API_URL}`, data)
      const url = res.data.url;
        return url;
    } catch (error) {
      console.log(error)
    }
    
    
  }

  export default upload
  