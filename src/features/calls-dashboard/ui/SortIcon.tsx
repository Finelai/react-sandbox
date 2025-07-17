import arrDown from '@assets/icons/arrow-down.png'
import arrUp from '@assets/icons/arrow-up.png'

export const SortIcon = ({
  isSorted,
}: {
  isSorted: false | 'asc' | 'desc'
}) => {
  const sortIcon = isSorted === 'asc' ? arrUp : arrDown

  return (
    <div className="ml-2 inline-block">
      <img src={sortIcon} />
    </div>
  )
}
