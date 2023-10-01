interface Props {
  d: string,
  color?: string
}

function SvgComp({ d, color = 'black' }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill={color} d={d} /></svg>
  )
}
function SvgCompBig({ d, color = 'black' }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={30} height={30}><path fill={color} d={d} /></svg>
  )
}

export { SvgComp, SvgCompBig }