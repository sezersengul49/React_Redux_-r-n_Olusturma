import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import Modal from '../components/Modal'
import Button from '../components/Button'
import Input from '../components/Input'
import { useEffect, useState } from 'react'
import { modalFunc } from '../redux/modalSlice'
import { createDataFunc, updateDataFunc } from '../redux/dataSlice'
import { useLocation, useNavigate } from 'react-router-dom'



const Product = () => {
  const {modal}= useSelector(state => state.modal)
  const {data,keyword}= useSelector(state => state.data)
  const location= useLocation();
  const dispatch= useDispatch();
  const navigate=useNavigate();

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
  });

  console.log(data)

  const onChangeFunc = (e, type) => {
    if (type == "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
 
  let loc= location?.search.split("=")[1]

useEffect(()=> {

if(loc){
setProductInfo(data.find(dt => dt.id == loc))
}
},[loc])


const buttonFunc=()=> {
dispatch(
  createDataFunc({...productInfo, id: data.length+1}))
dispatch(modalFunc())
}

 const buttonUpdateFunc= ()=> {
   dispatch(updateDataFunc({...productInfo, id:loc})) 
   dispatch(modalFunc());
   navigate('/')
 }

const contentModal = (
   <>
   <Input
    value={productInfo.name}
          type={"text"}
          placeholder={"ürün ekle"}
          name={"name"}
          id={"name"}
          onChange={(e) => onChangeFunc(e, "name")}
        />

        <Input 
        value={productInfo.price}
          type={"text"}
          placeholder={"fiyat ekle"}
          name={"price"}
          id={"price"}
          onChange={(e) => onChangeFunc(e, "price")}
        />

        <Input
          type={"file"}
          placeholder={"Resim sec"}
          name={"url"}
          id={"url"}
          onChange={(e) => onChangeFunc(e, "url")}
        />

         <Button btnText={loc ? "Ürün Güncelle" : "Ürün Oluştur"} onClick={loc ? buttonUpdateFunc : buttonFunc}/>
   </>
)
const filtredItems= data.filter(dt=> dt.name.toLowerCase().includes(keyword))

  return (
    <div>
<div className='flex items-center flex-wrap'>
  {filtredItems?.map((dt,i)=> (
    <ProductCard key={i} dt={dt}/>
  ))

  }
</div>

       
       {modal &&  <Modal content={contentModal} title={loc ? "Ürün Güncelle" : "Ürün Oluştur"}
       /> }
    </div>
  )
}

export default Product