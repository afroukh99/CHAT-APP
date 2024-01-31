import axios from 'axios';



const upload =async (file)=> {
    const data = new FormData()
    data.append('file', file)
    data.append("upload_preset","chatApp")
    data.append('api_key','715667984665829')
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/afroukh_99/image/upload", data)
      const url = res.data.url;
        return url;
    } catch (error) {
      console.log(error)
    }
    
    
  }

  export default upload
  