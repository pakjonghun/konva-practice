import { upload } from '../hooks/useNodeData';

const Button = () => {
  // const setCount = useBoardStore((state) => state.setCount);
  // const count = useBoardStore((state) => state.count);

  // const [keyword, setKeyword] = useState(String(count));
  // const handleChangeKeyword = useCallback((value: string) => {
  //   setKeyword(value);
  // }, []);

  // const delayText = useDebounce({ initText: keyword });

  const handleClickButton = () => {
    // setCount(parseFloat(delayText));
  };

  // useNodeStore((s) => s.setNode);

  return (
    <div>
      <input
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const formBody = new FormData();
          formBody.append('avatar', file);
          formBody.append('thumbnail', file);
          const data = {
            name: '테스터',
            phone: '010-1234-1351',
            birth: '1999-10-10',
            gender: 'M',
            address: 'seoul',
            programId: 'fbae8954-1a65-4f66-b253-522b4f5effd1',
            protectorList: [
              {
                name: '박수지',
                phone: '010-1313-4242',
                relation: '아들',
              },
              {
                name: '박수고',
                phone: '010-2313-4242',
                relation: '친구',
              },
            ],
            description: ['조심해요', '조심해요2'],
          };
          formBody.append('data', JSON.stringify(data));
          upload(formBody)
            .then(() => {
              e.target.value = '';
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        type="file"
        className="border-2 border-red-100  bg-pink-300"
        value={''}
        // onChange={(event) => handleChangeKeyword(event.target.value)}
      />
      <button className="bg-sky-50 border-2 border-red-100" onClick={handleClickButton}>
        증식
      </button>
      <button className="bg-sky-50 border-2 border-red-100" onClick={handleClickButton}>
        노드 맵 업데이트
      </button>
    </div>
  );
};

export default Button;
