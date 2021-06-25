import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type ButtonProps = {
  className?: string
  title: string
  onClick: () => void
  icon?: IconDefinition
}

export const Button: React.FC<ButtonProps> = ({ className, title, onClick, icon }) => {
  return (
    <button
      className={classNames(
        'hover:bg-grey text-white py-2 px-4 m-2 rounded inline-flex justify-center w-full max-w-xs',
        className,
      )}
      onClick={onClick}
    >
      {icon && (
        <span className="pr-2">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      <span>{title}</span>
    </button>
  )
}
