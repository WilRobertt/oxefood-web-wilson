import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Checkbox, Container, Divider, Form, FormGroup, FormInput, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { mensagemErro, notifyError, notifySuccess } from '../util/Util';


export default function FormEntregador () {
   
    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8082/api/entregador/" + state.id)
.then((response) => {
                           setIdEntregador(response.data.id)
                           setNome(response.data.nome)
                           setCpf(response.data.cpf)
                           setRg(response.data.rg)
                           setDataNascimento(formatarData(response.data.dataNascimento))
                           setFoneCelular(response.data.foneCelular)
                           setFoneFixo(response.data.foneFixo)
                           setQtdEntregas(response.data.qtdEntregas)
                           setValorFrete(response.data.valorFrete)
                           setRua(response.data.rua)
                           setNumero(response.data.numero)
                           setBairro(response.data.bairro)
                           setCidade(response.data.cidade)
                           setCep(response.data.cep)
                           setUf(response.data.uf)
            })
        }
}, [state])

function formatarData(dataParam) {

    if (dataParam === null || dataParam === '' || dataParam === undefined) {
        return ''
    }

    let arrayData = dataParam.split('-');
    return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
}

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregas, setQtdEntregas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [rua, setRua] = useState();
    const [numero, setNumero] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();
    const [uf, setUf] = useState();

    function salvar() {

		let entregadorRequest = {
		     nome: nome,
		     cpf: cpf,
             rg: rg,
		     dataNascimento: dataNascimento,
		     foneCelular: foneCelular,
		     foneFixo: foneFixo,
             qtdEntregas: qtdEntregas,
             valorFrete: valorFrete,
             rua:rua,
             numero:numero,
             bairro:bairro,
             cidade:cidade,
             cep:cep,
             uf:uf
		}
	
        if (idEntregador != null) { //Alteração:
            axios.put("http://localhost:8082/api/entregador/" + idEntregador, entregadorRequest)
            .then((response) => {notifySuccess('Entregador alterado com sucesso.')})
            .catch((error) => {if (error.response) {
                notifyError(error.response.data.errors[0].defaultMessage)
            } else {
                notifyError(mensagemErro)} })
                                
        } else { //Cadastro:
            axios.post("http://localhost:8082/api/entregador", entregadorRequest)
            .then((response) => {notifySuccess('Entregador Cadastrado com sucesso.')})
            .catch((error) => {if (error.response) {
                notifyError(error.response.data.errors[0].defaultMessage)
            } else {
                notifyError(mensagemErro)} })
                                
        } 
        }
	
    return (

        <div>
         <MenuSistema/>
            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                { idEntregador === undefined &&
    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
}
{ idEntregador != undefined &&
    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
}


                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    /> 
                                </Form.Input>
                                
                                <Form.Input
                                    required
                                    fluid
                                    label='RG'>
                                    <InputMask
                                        required
                                        mask="999.999.99"
                                    /> 
                                </Form.Input>
                            
                            </Form.Group>
                            
                            <Form.Group>
                            
                            <Form.Input
                                    fluid
                                    label='Dt Nascimento'
                                    width={6}
                                >
                                    <InputMask 
                                        mask="99/99/9999" 
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                    /> 
                                </Form.Input>
                                
                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask 
                                        mask="(99) 9999.9999"
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask 
                                        mask="(99) 9999.9999"
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    width={6} 
                                    maxLength="100">

                                    </Form.Input>
                                    
                                    <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    width={6} 
                                    maxLength="100">

                                    </Form.Input>
                            
                            </Form.Group>
                             
                             <FormGroup>
                             <Form.Input
                                    fluid
                                    label='Rua'
                                    width={15} 
                                    maxLength="100">

                                    </Form.Input>
                            <Form.Input
                                    fluid
                                    label='Número'
                                    width={6} 
                                    maxLength="10">

                                    </Form.Input>
                             </FormGroup>
                             <FormGroup>
                                <Form.Input
                                    fluid
                                    label="Bairro"
                                    width={6}
                                    maxLength="100">
                                    </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={6} 
                                    maxLength="100">

                                    </Form.Input>
                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={6}>
                                  <InputMask 
                                        mask="99999-999" 
                                    /> 
                                    </Form.Input>
                             </FormGroup>
                             
                             <FormGroup>
                             <Form.Input
                                    fluid
                                    label='UF'
                                    width={16}
                                    maxLength="10"
                                    />
                                 
                             </FormGroup>
                             
                             <FormGroup>
                             <FormInput
                             fluid
                             label="Complemento"
                             width={16}
                             maxLength="100">
                             </FormInput>
                             
                             </FormGroup>
                        
                        </Form>
                        
                        
                        <div>
                        <label htmlFor="" style={{color:""}}>Ativo</label>
                        <Checkbox
                        label="Sim">
                        </Checkbox>
                        
                        <Checkbox
                        label="Não">
                        </Checkbox>
                        </div>
                        <div style={{marginTop: '4%'}}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-cliente'}>Voltar</Link>
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>
                    
                </Container>
            </div>
        </div>

    )
}