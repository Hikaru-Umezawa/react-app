import { Tbody, Td, Button, Tfoot, Input, NumberInput, NumberInputField, FormControl } from "@chakra-ui/react";
import { Table, Thead, Tr, Th } from "@chakra-ui/table";
import { useForm } from "react-hook-form";
import { memo, useEffect, useState, VFC } from "react"
import { db } from "../../firebase"
import { collection, DocumentData, getDocs, QueryDocumentSnapshot } from "@firebase/firestore";

export const HealthTable: VFC = memo(() => {
  const { handleSubmit, register, formState: { errors, isSubmitting, isValid } } = useForm({ mode: "all" });
  // const onSubmit (data: data) => {

  // }


  return (
    <>
      <form>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>日付</Th>
              <Th>体重(kg)</Th>
              <Th>体脂肪率(%)</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>2021/12/14</Td>
              <Td>65</Td>
              <Td>20.4</Td>
              <Button size='sm' mt={3} mx={1} bg="teal.400" color="white" _hover={{ opacity: 0.8 }}>編集</Button>
              <Button size='sm' mt={3} mx={1} bg="red.400" color="white " _hover={{ opacity: 0.8 }}>削除</Button>
            </Tr>
            <Tr>
              <Td>2021/12/14</Td>
              <Td>65</Td>
              <Td>20.4</Td>
              <Button size='sm' mt={3} mx={1} bg="teal.400" color="white" _hover={{ opacity: 0.8 }}>編集</Button>
              <Button size='sm' mt={3} mx={1} bg="red.400" color="white">削除</Button>
            </Tr>
            <Tr>
              <Td>2021/12/14</Td>
              <Td>65</Td>
              <Td>20.4</Td>
              <Button size='sm' mt={3} mx={1} bg="teal.400" color="white" _hover={{ opacity: 0.8 }}>編集</Button>
              <Button size='sm' mt={3} mx={1} bg="red.400" color="white">削除</Button>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th><Input type="date"></Input></Th>
              <Th><NumberInput defaultValue={50}><NumberInputField /></NumberInput></Th>
              <Th><NumberInput defaultValue={20}><NumberInputField /></NumberInput></Th>
              <Button type="submit" disabled={!isValid}
                loading={isSubmitting} size='sm' mt={4} mx={1} bg="teal.400" color="white" _hover={{ opacity: 0.8 }} >登録</Button>
            </Tr>
          </Tfoot>
        </Table>
      </form>
    </>
  )
})
