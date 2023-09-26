import { useParams, useNavigate } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {  FerramentasDeDetalhes } from '../../shared/components';
import { useEffect, useState } from 'react';
import { PessoasService } from '../../shared/service/api/pessoas/PessoasService';



export const DetalheDePessoas: React.FC =() =>{ 
  const {id = 'nova'} =useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');



  useEffect(() => {
    if(id !== 'nova') {
      setIsLoading(true);
      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setNome(result.nomeCompleto);
            console.log(result);
          }
        }
        );
    }
  }, [id]);

  const handleSave = () => {
    console.log('Save');
  };
  const handleDelete =(id:number) =>{
    if(confirm('Deseja realemente excluir?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if(result instanceof Error){
            alert(result.message);
          } else {          
            alert('Registro deletado com sucesso');
            navigate('/pessoas');
          }
        });
    }
  };
  
  return(
    <LayoutBaseDePagina titulo={id === 'nova' ? 'Nova pessoa' : nome }barraDeFerramentas={<FerramentasDeDetalhes  
      textoBtn='Nova' 
      btnNovo = {id !== 'nova'}
      btnApagar ={id !== 'nova'}
      btnSalvarFechar    
      aoClicarNovo={() => navigate('/pessoas/detalhe/nova')}
      aoClicarSalvar={handleSave}
      aoClicarVoltar={() => navigate('/pessoas')}
      aoClicarSalvarFechar={()=> {}}
      aoClicarApagar={()=> handleDelete(Number(id))}
    />
    }>  
      <p>Detalhe de pessoa {id}</p>        
    </LayoutBaseDePagina> 
    
  );
};