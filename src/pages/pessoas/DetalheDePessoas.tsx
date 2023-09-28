import { useParams, useNavigate } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {  FerramentasDeDetalhes } from '../../shared/components';
import { useEffect, useRef, useState } from 'react';
import { PessoasService } from '../../shared/service/api/pessoas/PessoasService';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';
import { FormHandles } from '@unform/core';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';

interface IFormData {
  email: string
  cidadeId:number
  nomeCompleto: string
}

export const DetalheDePessoas: React.FC =() =>{ 
  const {id = 'nova'} =useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  const hadleSave = (dados : IFormData) => {
    setIsLoading(true);
    if(id=== 'nova') {
      PessoasService
        .create(dados)
        .then((result) => {
          setIsLoading(false);
          if(result instanceof Error) {
            alert(result.message);
          }else {
            navigate(`/pessoas/detalhe/${result}`);
          }
        });
    } else {
      PessoasService
        .updateById(Number(id), {id: Number(id), ...dados})
        .then((result) => {
          setIsLoading(false);
          if(result instanceof Error) {
            alert(result.message);
          }
        });
    }
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
            formRef.current?.setData(result);
          }
        });
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
        <Box display="flex" flexDirection="column" margin={1} component={Paper} variant='outlined'>  
          <Grid container direction="column" padding={2} spacing={2} >
            <Grid item direction="row" margin={1}> 
              <Typography variant='h5'> Cadastro geral</Typography>
            </Grid>   
            {(isLoading && 
              <Grid item > 
                <LinearProgress variant='indeterminate'/>
              </Grid>  
            )}       
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <VTextField 
                  fullWidth 
                  label='Nome Completo'
                  name='nomeCompleto'
                  onChange={e => setNome(e.target.value)}
                />   
              </Grid>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6}>              
                  <VTextField  
                    label='Email'
                    fullWidth 
                    name='email'                   
                  />   
                </Grid>
              </Grid>
              <Grid container item direction="row"spacing={2}>
                <Grid item xs={12} sm={12} md={6}> 
                  <VTextField 
                    fullWidth 
                    label="Cidade"
                    name='cidadeId'/>             
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>                  
      </Form>    
    </LayoutBaseDePagina> 
    
  );
};