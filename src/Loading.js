import React from 'react'

export default function Loading(props) {
  return (
    <div className="loading">
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <span className="ml-4">{props.title}</span>
    </div>
  )
}