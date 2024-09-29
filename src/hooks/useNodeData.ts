import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BoardData } from '../store/logicStore/types/logic';

const instance = axios.create();
const NODE_DATA = 'NODE_DATA';
type ResponseBoard = BoardData;

const loadNodeData = () => {
  return instance.get('/nodeData.json').then((res) => res.data);
};

export const useLoadNodeData = () => {
  return useQuery<ResponseBoard, void>({
    queryKey: [NODE_DATA],
    queryFn: loadNodeData,
  });
};

export const upload = (file: FormData) => {
  return instance
    .post('https://api.server-kit.com/run/check-in', file, {
      headers: {
        serverkit_instance_id: '66f12f07f37f857fefb0a0c3',
        userkit_token:
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InhaNzBTUzl4NE5zTVNuZ3ciLCJwZXJtaXNzaW9ucyI6WyI2NmYxMmYwN2YzN2Y4NTdmZWZiMGEwYzNfNjZmM2RhYWU5YjA1ZjhlYmI5ODVhM2NiIl0sInVzZXJHcm91cElkIjoiNjZmMTJmMDdmMzdmODU3ZmVmYjBhMGMzXzY2ZjNkYWFlOWIwNWY4ZWJiOTg1YTNjYSIsImluc3RhbmNlSWQiOiI2NmYxMmYwN2YzN2Y4NTdmZWZiMGEwYzMiLCJpYXQiOjE3MjczMzQzNjF9.S19i8YxKPiVt9r8VqupKBjOIqrsI7gfJtIaT1ilwnMO5dt3z55L4bUWTEevtBGgMl3XjVW8fiJiH0qRDKK9QvY9itSXMCOWxSlQhqv2PrfZzRMrDKJ7muyi8Xl5-HBycVB8wRRiCrsYvqeAHHNESBl1COfKTdJXZm_sGLMhyCtgcxxrBlF6nA2aALAmueX4HDx-flnGebX5F0lzt7iH-2oLksZMramn3yK3XUc1LcBOpOvSEQBy0qPeYw8Sa0222lnK2i0__LxnWAc8fVpraPnV4n0W3CdWllK2e1su27mDLmD0sc2_uweRo95LY4R2pSJvBEh5f0sjPxRZu4PxpPg',
        serverkit_project_id: '66f12f0760f82da8f7b94be7',
      },
    })
    .then((res) => res.data);
};
