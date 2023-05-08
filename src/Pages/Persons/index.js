import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { gql, useMutation, useQuery } from "@apollo/client";

import { Button, Space, Table, Tag, Modal, Input } from "antd";
import { useEffect, useState } from "react";
const { Column } = Table;

export const PERSON_LIST_QUERY = gql`
  query PersonList($sort: ListPersonsSort!, $filter: ListPersonsFilter!) {
    listPersons(sort: $sort, filter: $filter) {
      message
      count
      data {
        id
        tmdbId
        birthday
        knownForDepartment
        deathday
        name
        alsoKnownAs
        gender
        biography
        popularity
        placeOfBirth
        profilePath
        homePage
        adult
      }
    }
  }
`;

export const DELETE_PERSON_QUERY = gql`
  mutation DeletePersonData($id: ID!) {
    deletePerson(id: $id) {
      message
    }
  }
`;

export const EDITING_PERSON_QUERY = gql`
  mutation personListEditing($id: ID!, $data: UpdatePersonInput!) {
    updatePerson(id: $id, data: $data) {
      message
      data {
        id
        tmdbId
        birthday
        knownForDepartment
        deathday
        name
        alsoKnownAs
        gender
        biography
        popularity
        placeOfBirth
        profilePath
        homePage
        adult
      }
    }
  }
`;

export const ADD_PERSON_DATA = gql`
mutation AddPerson($data:PersonInput!){
  createPerson(data:$data){
    message
    data{
      name    
    }
  }
}
`

const Persons = () => {

  const [newperson,setNewPerson] = useState({
    name:"",
    gender:"",
    popularity:"",
    knownForDepartment:""
  });

  const [searchedText, setSearchedText] = useState("");
  const [editPersonId, setEditPersonId] = useState("");
  const [editPerson, seteditPerson] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [sourceData, setSourceData] = useState();
  const [deleteId, setDeleteId] = useState("");
  const [isAddpersonEditable,setAddPersonEditable] = useState(false)

  const { data } = useQuery(PERSON_LIST_QUERY, {
    variables: {
      sort: {
        field: "createdAt",
        order: "DESC",
      },
      filter: {},
    },
  });

  const [deletefunc] = useMutation(DELETE_PERSON_QUERY, {
    variables: {
      id: deleteId,
    },
  });

  if (editPerson) {
    var { name, gender, knownForDepartment, popularity } = editPerson;
  }

  const [editfunc] = useMutation(EDITING_PERSON_QUERY, {
    variables: {
      id: editPersonId,
      data: {
        name,
        gender,
        knownForDepartment,
        popularity: Number(popularity),
      },
    },
  });
  
  const [addPersonData] = useMutation(ADD_PERSON_DATA,{
    variables:{
      data:newperson
    }
  })

  const deleteRecord = async (record) => {
    Modal.confirm({
      title: "Are You sure you want to delete",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDeleteId(record.id);
        setSourceData((pre) => {
          deletefunc();
          return pre.filter((elem) => elem.id !== record.id);
        });
      },
    });
  };

  const onEditPerson = async (record) => {
    setIsEditable(true);
    await setEditPersonId(record.id);
    seteditPerson({ ...record });
  };
  
  const handleAddPerson = () => {
    setAddPersonEditable(true)
  }

  const personData = data?.listPersons?.data;

  useEffect(() => {
    if (data) {
      setSourceData(personData);
    }
  }, [data]);


  return (
    <div className="persona_page">
      <div className="persona_page_btn">
          <Button onClick={handleAddPerson}>Add New Person</Button>
        <Input.Search
          placeholder="Enter Your Text"
          onSearch={(value) => {
            setSearchedText(value);
          }}
          onChange={(e)=>{setSearchedText(e.target.value)}}
        />
    </div>

      {sourceData && (
        <Table dataSource={sourceData}>
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Gender"
            dataIndex="gender"
            key="gender"
            filteredValue={[searchedText]}
            onFilter={(value, record) => {
              return String(record.name)
                .toLocaleLowerCase()
                .includes(value.toLowerCase())||
                String(record.gender)
                .toLocaleLowerCase()
                .includes(value.toLowerCase())||
                String(record.popularity)
                .toLocaleLowerCase()
                .includes(value.toLowerCase())||
                String(record.knownForDepartment)
                .toLocaleLowerCase()
                .includes(value.toLowerCase())
            }}
          />
          <Column
            title="Departmeny"
            dataIndex="knownForDepartment"
            key="knownForDepartment"
          />
          <Column title="Popularity" dataIndex="popularity" key="popularity" />

          <Column
            title="Action"
            key="id"
            render={(_, record) => (
              <Space size="middle">
                <EditOutlined onClick={() => onEditPerson(record)} />
                <Button
                  onClick={() => {
                    deleteRecord(record);
                  }}
                >
                  <DeleteOutlined />
                </Button>
              </Space>
            )}
          />
        </Table>
      )}
      <Modal
        title="Edit person"
        open={isEditable}
        onCancel={() => {
          setIsEditable(false);
        }}
        onOk={() => {
          editfunc();
          setSourceData((pre) => {
            return pre.map((person) => {
              if (person.id === editPerson.id) {
                return editPerson;
              } else {
                return person;
              }
            });
          });
          setIsEditable(false);
        }}
      >
        <Input
          value={editPerson?.name}
          onChange={(e) => {
            seteditPerson({ ...editPerson, name: e.target.value });
          }}
        />
        <Input
          value={editPerson?.gender}
          onChange={(e) => {
            seteditPerson({ ...editPerson, gender: e.target.value });
          }}
        />
        <Input
          value={editPerson?.popularity}
          onChange={(e) => {
            seteditPerson({ ...editPerson, popularity: e.target.value });
          }}
        />
        <Input
          value={editPerson?.knownForDepartment}
          onChange={(e) => {
            seteditPerson({ ...editPerson, knownForDepartment: e.target.value });
          }}
        />
      </Modal>
      <Modal
        title="Add person"
        open={isAddpersonEditable}
        onCancel={() => {
          setAddPersonEditable(false);
        }}
        onOk={()=>{
          addPersonData();
          setAddPersonEditable(false)
          setSourceData((pre)=>{
            return [...pre,newperson]
          })
        }}
        >
          <Input value={newperson.name}
          onChange={(e)=>{setNewPerson({...newperson,name:e.target.value})}}
          placeholder="Enter Name of A person"
          />
           <Input value={newperson.gender}
          onChange={(e)=>{setNewPerson({...newperson,gender:e.target.value})}}
          placeholder="gender Value"
          />
           <Input value={newperson.popularity}
          onChange={(e)=>{setNewPerson({...newperson,popularity:Number(e.target.value)})}}
          placeholder="write propularity in Numbers"
          />
           <Input value={newperson.knownForDepartment}
          onChange={(e)=>{setNewPerson({...newperson,knownForDepartment:e.target.value})}}
          placeholder="Enter Your Department"
          />
        </Modal>
    </div>
  );
};

export default Persons;
