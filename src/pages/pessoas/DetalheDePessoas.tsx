import { useParams, useNavigate } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {  FerramentasDeDetalhes } from '../../shared/components';
import { useEffect, useRef, useState } from 'react';
import { PessoasService } from '../../shared/service/api/pessoas/PessoasService';
import { Form } from '@unform/web';
import { TextField } from '@mui/material';
import { VTextField } from '../../shared/forms';
import { FormHandles } from '@unform/core';

interface IFormData {
  email: string
  cidadeId:string
  nomeCompleto: string
}

export const DetalheDePessoas: React.FC =() =>{ 
  const {id = 'nova'} =useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  const hadleSave = (dados : IFormData) => {
    console.log(dados);
  };

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
      aoClicarSalvar={()=> formRef.current?.submitForm()}
      aoClicarVoltar={() => navigate('/pessoas')}
      aoClicarSalvarFechar={()=> formRef.current?.submitForm()}
      aoClicarApagar={()=> handleDelete(Number(id))}
    />
    }>  
      <Form  ref={formRef} onSubmit={hadleSave}>
        <VTextField name='email'/>   
        <VTextField name='nomeCompleto'/>   
        <VTextField name='cidadeId'/>                
      </Form>    
    </LayoutBaseDePagina> 
    
  );
};