import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

import { Button, Space, Table, Modal, Input, Typography, Select } from "antd";
import { useEffect, useState } from "react";
import {
  DELETE_PERSON_QUERY,
  EDITING_PERSON_QUERY,
  PERSON_LIST_QUERY,
} from "../../graphQl/person";
import { ADD_PERSON_DATA } from "../../graphQl/addperson";
const { Column } = Table;

const Persons = () => {
  const [sortby,setSortBy] = useState("DESC")
  const [adddata, setAddData] = useState("");
  const [searchedText, setSearchedText] = useState("");
  const [editPersonId, setEditPersonId] = useState("");
  const [editPerson, seteditPerson] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [sourceData, setSourceData] = useState();
  const [deleteId, setDeleteId] = useState("");
  const [isAddpersonEditable, setAddPersonEditable] = useState(false);

  const [newperson, setNewPerson] = useState({
    name: "",
    gender: "",
    popularity: "",
    knownForDepartment: "",
  });

  const [personDataFetch] = useLazyQuery(PERSON_LIST_QUERY, {
    fetchPolicy: "network-only",
    onCompleted(res) {
      setSourceData(res.listPersons.data);
    },
  });

  const [deletefunc] = useMutation(DELETE_PERSON_QUERY, {
    fetchPolicy: "network-only",
    onCompleted() {
      setSourceData((pre) => {
        return pre.filter((elem) => elem.id !== deleteId);
      });
    },
  });

  const [editfunc] = useMutation(EDITING_PERSON_QUERY, {
    fetchPolicy: "network-only",
    onCompleted(res) {
      setSourceData((pre) => {
        return pre.map((person) => {
          if (person.id === editPerson.id) {
            return editPerson;
          } else {
            return person;
          }
        });
      });
    },
  });

  const [addPersonData] = useMutation(ADD_PERSON_DATA, {
    fetchPolicy: "network-only",
    onCompleted(res) {
      setAddData("successfull");
    },
  });

  const deleteRecord = async (record) => {
    Modal.confirm({
      title: "Are You sure you want to delete",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDeleteId(record.id);
        deletefunc({
          variables: {
            id: record.id,
          },
        });
      },
    });
  };

  const onEditPerson = async (record) => {
    setIsEditable(true);
    setEditPersonId(record.id);
    seteditPerson({ ...record });
  };

  const handleAddPerson = () => {
    setAddPersonEditable(true);
  };

  const personData = () => {
    personDataFetch({
      variables: {
        sort: {
          field: "createdAt",
          order: sortby,
        },
        filter: {
          searchTerm:searchedText
        },
      },
    });
  };

  const handleSortBy = (value) => {
    setSortBy(value)
  };
  
  let id;
  const handleChange = (e) => {
   clearTimeout(id);
   id = setTimeout(()=>{
     setSearchedText(e.target.value)
   },1000)
  }

  const handelInfiniteScroll = () => {
    console.log("setTarget e target value")
  }

  useEffect(() => {
    personData()

    // eslint-disable-next-line
  }, [adddata, sortby, searchedText]);

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <div className="persona_page">
      <div className="persona_page_btn">
        <Button onClick={handleAddPerson}>Add New Person</Button>
        <Input.Search
          placeholder="Enter Your Text"
          onChange={handleChange}
        />
           <Select
      defaultValue="DESC"
      style={{
        width: 120,
        marginLeft:"5px"
      }}
      onChange={handleSortBy}
      options={[
        {
          value: 'ASC',
          label: 'ASC',
        },
        {
          value: 'DESC',
          label: 'DESC',
        }
      ]}
    />
      </div>

      {sourceData && (
        <Table
          dataSource={sourceData}
          rowKey={(obj) => obj.id}
          className="personscrooldiv"
        >
          <Column title="Name" dataIndex="name" />
          <Column
            title="Gender"
            dataIndex="gender"
            key="gender"
            // filteredValue={[searchedText]}
            // onFilter={(value, record) => {
            //   return (
            //     String(record.name)
            //       .toLocaleLowerCase()
            //       .includes(value.toLowerCase()) ||
            //     String(record.gender)
            //       .toLocaleLowerCase()
            //       .includes(value.toLowerCase()) ||
            //     String(record.popularity)
            //       .toLocaleLowerCase()
            //       .includes(value.toLowerCase()) ||
            //     String(record.knownForDepartment)
            //       .toLocaleLowerCase()
            //       .includes(value.toLowerCase())
            //   );
            // }}
          />
          <Column
            title="Departmeny"
            dataIndex="knownForDepartment"
            key="knownForDepartment"
          />
          <Column title="Popularity" dataIndex="popularity" />

          <Column
            title="Action"
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
          editfunc({
            variables: {
              id: editPersonId,
              data: {
                name: editPerson?.name,
                gender: editPerson?.gender,
                knownForDepartment: editPerson.knownForDepartment,
                popularity: Number(editPerson.popularity),
              },
            },
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
          value={editPerson?.gender.toUpperCase()}
          onChange={(e) => {
            seteditPerson({ ...editPerson, gender: e.target.value });
          }}
        />
        <Input
          value={editPerson?.popularity}
          type="number"
          onChange={(e) => {
            seteditPerson({ ...editPerson, popularity: e.target.value });
          }}
        />
        <Input
          value={editPerson?.knownForDepartment}
          onChange={(e) => {
            seteditPerson({
              ...editPerson,
              knownForDepartment: e.target.value,
            });
          }}
        />
      </Modal>
      <Modal
        title="Add person"
        open={isAddpersonEditable}
        onCancel={() => {
          setAddPersonEditable(false);
        }}
        onOk={() => {
          addPersonData({
            variables: {
              data: newperson,
            },
          });
          setAddPersonEditable(false);
        }}
      >
        <Input
          value={newperson.name}
          onChange={(e) => {
            setNewPerson({ ...newperson, name: e.target.value });
          }}
          placeholder="Enter Name of A person"
        />
        <Input
          value={newperson.gender.toUpperCase()}
          onChange={(e) => {
            setNewPerson({ ...newperson, gender: e.target.value });
          }}
          placeholder="gender Value"
        />
        <Input
          value={newperson.popularity}
          type="number"
          onChange={(e) => {
            setNewPerson({ ...newperson, popularity: Number(e.target.value) });
          }}
          placeholder="write propularity in Numbers"
        />
        <Input
          value={newperson.knownForDepartment}
          onChange={(e) => {
            setNewPerson({ ...newperson, knownForDepartment: e.target.value });
          }}
          placeholder="Enter Your Department"
        />
      </Modal>
    </div>
  );
};

export default Persons;
