import { confirm, ConfirmContainer, type ColorSchema, type AnimationType } from 'react-confirm-lite'
import './App.css'
import { useState } from 'react'

const ThemePreview = ({ theme }: { theme: ColorSchema }) => {
  const [isClicked, setisClicked] = useState<boolean>(false)

  const handleClick = async () => {
    setisClicked(true)
    const isConfirmed = await confirm('Are you sure?')
    setisClicked(false)
    if (isConfirmed === null) console.log('User clicked outside or pressed escape')
    else if (isConfirmed) console.log('Ok')
    else console.log('Cancle')
  }

  return (
    <div className={`${isClicked ? 'fixed left-0 top-0 w-full h-full bg-white z-50' : ''}`}>
      <button onClick={handleClick}>
        Try
      </button>
      <ConfirmContainer defaultColorSchema={theme} />
    </div>
  )
}

export default function App() {
  const themes: ColorSchema[] = ['blue', 'dark', 'green', 'light', 'purple', 'red']

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete item',
      message: 'This action cannot be undone. Continue?',
      okText: 'Delete',
      cancelText: 'Cancel'
    })

    if (!confirmed) {
      console.log('User cancelled')
      return
    }

    const doubleCheck = await confirm({
      title: 'Final confirmation',
      message: 'Are you absolutely sure?',
      okText: 'Yes, delete it',
      cancelText: 'Go back'
    })

    console.log('Final decision:', doubleCheck)
  }

  return (
    <div className="app">
      <h1>react-confirm-lite</h1>
      <p>Example usage</p>
      <button className="danger" onClick={handleDelete}>
        Delete item
      </button>
      {themes.map((theme) => (
        <ThemePreview theme={theme} key={theme} />
      ))}
      <ConfirmContainer id='1' />
      <Animations />
    </div>
  )
}

function Animations() {
  const Animations: AnimationType[] = ['bounce', 'bounceSmall', 'drop', 'fadeBlur', 'fadeDown', 'fadeScale', 'fadeScale', 'fadeShrink', 'fadeUp', 'flip', 'rotate', 'rotateRight', 'slide', 'slideLeft', 'slideRight', 'zoom', 'zoomSmall']
  return (
    <div>
      {
        Animations.map((animation, index) => (
          <div key={index}>
            <button onClick={() => confirm('Are you sure?')}>
              {animation}
            </button>
            <div>
              <ConfirmContainer animation={animation} />
            </div>
          </div>
        ))
      }
    </div>
  )
}