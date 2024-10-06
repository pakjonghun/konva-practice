const Inspector = () => {
  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        height: '100%',
        width: '200px',
        backgroundColor: 'white',
        zIndex: 9999,
      }}
    >
      <input placeholder="노드 이름" className="bg-white border-black border-2 p-1" />
    </div>
  );
};

export default Inspector;
