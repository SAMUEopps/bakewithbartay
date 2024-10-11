import React, { useEffect } from 'react';
import styles from "./About.module.scss"

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className={styles.about}>
      <h2>About B w B</h2>
      <p>description goes here...</p>. 
    </div>
  )
}
