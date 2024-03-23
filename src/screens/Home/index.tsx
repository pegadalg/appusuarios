import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Alert,} from "react-native";
import { styles } from './styles';
import { Users } from "../../components/Users";

type Props = {
  id: string,
  name: string,
  email: string,
  cpf: string
}

export function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCPF] = useState('')
  const [users, setUsers] = useState<Props[]>([])

  
  function handleAddNewUser() {

    const ExisteoEmail= users.filter(ExisteEmail => ExisteEmail.email === email.trim())
      console.log(ExisteoEmail)

    if (ExisteoEmail.length>0) {
        return Alert.alert('Email', 'Este e-mail já está sendo utilizado')
      }

    const ExisteoCPF= users.filter(ExisteCPF => ExisteCPF.cpf === cpf.trim())
      console.log(ExisteoCPF)

    if (ExisteoCPF.length>0) {
        return Alert.alert('CPF', 'Este CPF já está sendo utilizado')
      }

    if (name.trim() === "") {
        return Alert.alert('Nome', 'Favor preencha o campo "Nome do usuario" ')
      }

    if (email.trim() === "") {
        return Alert.alert('Email', 'Favor preencha o campo "Email do usuario" ')
      }

    if (cpf.trim() === "") {
        return Alert.alert('CPF', 'Favor preencha o campo "CPF do usuario" ')
      }

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      
    if (!emailRegex.test(email)) {
        return Alert.alert('Email', 'E-mail inválido. Por favor, insira um e-mail válido.');
      }
      
      const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
        return Alert.alert('CPF', 'CPF inválido. Deve conter 11 números e não pode conter outro tipo de caractere.');
      }
      
    const data = {
      id: String(new Date().getTime()),
      name,
      email,
      cpf
    }

    console.log(data)
    setUsers([...users, data])
    setName('')
    setEmail('')
    setCPF('')

  }

  function handleRemoveUser(cpf: string, name: string) {
    console.log(`Você quer remover o usuario de cpf: ${cpf}`)
      Alert.alert('Remover',`Remover o usuario ${name}`, [
        {
          text: 'Sim',
          onPress: () => setUsers( users.filter(x => x.cpf != cpf) )
        },
        {
          text:'Não',
          style: 'cancel'
        }
      ])
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.eventName}>
        Cadastro de Usuários
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do usuario"
          placeholderTextColor='#6B6B6B'
          autoCapitalize="words"
          value={name}
          onChangeText={value => setName(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email do usuario"
          placeholderTextColor='#6B6B6B'
          autoCapitalize="none"
          value={email}
          onChangeText={value => setEmail(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF do usuario"
          placeholderTextColor='#6B6B6B'
          keyboardType="numeric"
          value={cpf}
          onChangeText={value => setCPF(value)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddNewUser}>
          <Text style={styles.buttonText}>
            Incluir
          </Text>
        </TouchableOpacity>

      </View>

      <FlatList 
          
          showsVerticalScrollIndicator =  {false} 
          showsHorizontalScrollIndicator = {false}
          data={users}
          keyExtractor={item => item.cpf.toString()}
          renderItem={({ item }) => (
            <Users
              name={item.name}
              email= {item.email}
              cpf= {item.cpf}
              onRemove={() => handleRemoveUser(item.cpf, item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.listEmptyText}>
              Adicione um Usuário!
            </Text>
          )}
        ></FlatList>
    </View>
    
  )
}


