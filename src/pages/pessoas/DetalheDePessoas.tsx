import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import { PessoasService } from '../../shared/service/api/pessoas/PessoasService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import {  FerramentasDeDetalhes } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import * as yup from 'yup';

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  cidadeId: yup.number().required(),
  email: yup.string().required().email(),
  nomeCompleto: yup.string().required().min(3),
});

export const DetalheDePessoas: React.FC =() =>{
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const {id = 'nova'} =useParams<'id'>();
  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');



  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setNome(result.nomeCompleto);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        email: '',
        cidadeId: '',
        nomeCompleto: '',
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === 'nova') {
          PessoasService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/pessoas');
                } else {
                  navigate(`/pessoas/detalhe/${result}`);
                }
              }
            });
        } else {
          PessoasService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/pessoas');
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso!');
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
      aoClicarSalvar={save}
      aoClicarVoltar={() => navigate('/pessoas')}
      aoClicarSalvarFechar={saveAndClose}
      aoClicarApagar={()=> handleDelete(Number(id))}
    />
    }>  
      <VForm  ref={formRef} onSubmit={handleSave}>
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
      </VForm>    
    </LayoutBaseDePagina> 
    
  );
};