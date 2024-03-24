'use client'
// ReactとReactのHooksであるuseStateをインポートします
import React, { useState } from 'react'

// プロパティの型定義を行います。初期カウントをnumber型で受け取ることができます
type Props = {
  hours: number
  minutes: number
  seconds: number
}

// TimerAppというFunctional Componentを定義します。Props型のinitialCountを受け取ります
const TimerApp = ({hours, minutes, seconds}: Props) => {
  const initialCount = ((hours * 60) + minutes) * 60 + seconds;
  // カウントとその更新関数をuseState Hookで定義します。
  // 初期値はPropsから受け取った初期カウントです
  const [count, setCount] = useState(initialCount)
  // タイマーが動いているかどうかの状態とその更新関数をuseState Hookで定義します。
  // 初期値はfalseです
  const [isRunning, setIsRunning] = useState(false)

  // 入力された時間を管理するための状態を追加
  const [inputHours, setInputHours] = useState(hours.toString());
  const [inputMinutes, setInputMinuts] = useState(minutes.toString());
  const [inputSeconds, setInputSeconds] = useState(seconds.toString());

  const set = () => {
    const newInitialCount = ((parseInt(inputHours) * 60) + parseInt(inputMinutes)) * 60 + parseInt(inputSeconds);
    setCount(newInitialCount)
  }
  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)
  const reset = () => {
    setCount(initialCount)
    setIsRunning(false)
    setInputHours(hours.toString())
    setInputMinuts(minutes.toString())
    setInputSeconds(seconds.toString())
  }

  // カウントダウンを実行する関数を定義します。
  // カウントが0より大きいとき、カウントを1減らします
  const tick = () => {
    if (count > 0) setCount((prevCount) => prevCount - 1)
  }

  // useEffect Hookを使って、コンポーネントのレンダリング後に実行する処理を設定します
  React.useEffect(() => {
    let timerId: NodeJS.Timeout | null = null

    // タイマーが動いていて、カウントが0より大きい場合、
    // 1秒ごとにtick関数を実行するタイマーを設定します
    if (isRunning && count > 0) {
      timerId = setInterval(() => {
        tick()
      }, 1000)
    }

    // クリーンアップ関数を定義します。
    // この関数はコンポーネントがアンマウントされたとき、
    // または依存配列が更新されたときに呼ばれます。ここではタイマーをクリアします
    return () => {
      if (timerId) clearInterval(timerId)
    }
  }, [isRunning, count])
  // 依存配列にisRunningとカウントを指定します。
  // これにより、いずれかが変更されるたびにエフェクトが実行されます

  const secondsToHMS = (count: number) => {
    const hours = Math.floor(count / 3600);
    const minutes = Math.floor((count % 3600) / 60);
    const secondsLeft = count % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(secondsLeft).padStart(2, '0');

    return [formattedHours, formattedMinutes, formattedSeconds];
  }

  // 残り時間が5分未満かどうかを判定
  const isLessThanFiveMinutes = count < 5 * 60;
  const isLessThanZeroMinutes = count <= 0;

  return (
    <div id='timer-text' className={`timer-text ${isLessThanZeroMinutes ? 'bg-red-600' : ''}`}>
      <div className={`p-8 text-center ${isLessThanFiveMinutes ? 'text-amber-300' : ''}`}>
        <div className='text-6xl'>{secondsToHMS(count)[0]}</div>h
        <div className='text-6xl'>{secondsToHMS(count)[1]}</div>m
        <div className='text-6xl'>{secondsToHMS(count)[2]}</div>s
      </div>

      <div className='p-8'>
        <input
          type="number"
          value={inputHours}
          onChange={(e) => setInputHours(e.target.value)}
          className="w-24 rounded-md border-0 py-1.5 pl-5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 py-2 px-4 mb-2 mx-2 "
          placeholder="Hours"
        />
        <input
          type="number"
          value={inputMinutes}
          onChange={(e) => setInputMinuts(e.target.value)}
          className="w-24 rounded-md border-0 py-1.5 pl-5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 py-2 px-4 mb-2 mx-2 "
          placeholder="Minuts"
        />
        <input
          type="number"
          value={inputSeconds}
          onChange={(e) => setInputSeconds(e.target.value)}
          className="w-24 rounded-md border-0 py-1.5 pl-5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 py-2 px-4 mb-2 mx-2 "
          placeholder="Seconds"
        />
        <button onClick={set} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 mx-2 rounded">
          Set
        </button>
      </div>
      <div className='p-8'>
        <button onClick={start} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 mx-2 rounded">Start</button>
        {/*Pauseボタンを非表示 <button onClick={pause} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 mx-2 rounded">Pause</button> */}
        <button onClick={reset} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 mx-2 rounded">Reset</button>
      </div>
    </div>
  )
}

export default TimerApp
