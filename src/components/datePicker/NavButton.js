/** @jsx jsx */

import { jsx } from "@emotion/core";
import React, { useState } from "react";

import { css } from "@emotion/core";
export default function NavButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      css={{
        outline:'none',
        margin: '0 1rem 1rem',
        padding: '1rem',      
        border:'none',
        width:'5rem',
        backgroundColor: '#333745',
        fontSize: '10px',
        color: 'white',
      }}
    >
      {children}
    </button>
  );
}