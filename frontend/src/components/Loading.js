import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div style={styles.overlay}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#000000"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, 
  },
};

export default Loading;
