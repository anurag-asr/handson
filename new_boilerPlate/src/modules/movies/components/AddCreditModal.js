import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/client';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
} from 'antd';

import {
  cloneDeep,
  debounce,
  findIndex,
  map,
  trim,
  uniq,
  uniqBy,
  uniqueId,
} from 'lodash';

import React, { useCallback, useEffect, useState } from 'react';
import { CREDIT_TYPE, GENDER, LIMIT } from '../../../common/constants';
import { formValidatorRules } from '../../../common/utils';
import Portal from '../../../components/Portal';
import { LIST_PERSONS } from '../graphql/Queries';

const { required } = formValidatorRules;

const initialPersonFilter = {
  filter: {
    skip: 0,
    limit: LIMIT,
  },
  sort: {
    field: 'createdAt',
    order: 'DESC',
  },
};
let personDebounce = null;
const AddCreditModal = ({
  showModal,
  onCancel,
  creditsForm,
  setCreditsData,
  setShowModal,
  creditsData,
  handleShowPrompt,
  editData,
  setEditData,
}) => {
  const [persons, setPersons] = useState([]);
  const [personLoading, setPersonLoading] = useState(false);
  const [personSearch, setPersonSearch] = useState(false);
  const [personSearchTerm, setPersonSearchTerm] = useState('');
  const [isPersonEnd, setIsPersonEnd] = useState(false);
  const [personDebounceCall, setPersonDebounceCall] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState([]);

  const [fetchPersons] = useLazyQuery(LIST_PERSONS, {
    variables: initialPersonFilter,
    fetchPolicy: 'network-only',
    onCompleted(res) {
      setPersons([...res?.listPersons?.data]);
      if (res?.listPersons?.data?.length < LIMIT) {
        setIsPersonEnd(true);
      }
      if (personSearch) {
        if (res?.listPersons?.data?.length === 0) {
          setPersons([
            {
              name: personSearchTerm,
            },
            ...persons,
          ]);
        } else {
          setPersons([...res?.listPersons?.data]);
        }
      } else {
        setPersons(uniqBy([...persons, ...res?.listPersons?.data], 'id'));
      }
      setPersonLoading(false);
    },
    onError() {},
  });

  useEffect(() => {
    fetchPersons();
  }, []);

  const onPersonsScroll = (event) => {
    setPersonSearch(false);
    if (personDebounce) {
      personDebounce?.cancel();
    }
    personDebounce = debounce(() => {
      const { target } = event;
      const { scrollTop, scrollHeight, offsetHeight } = target || {};
      const scrolledToBottom = scrollTop + offsetHeight >= scrollHeight - 5;
      if (scrolledToBottom && !isPersonEnd) {
        setPersonDebounceCall((prevState) => prevState + 1);
        setPersonLoading(true);
        fetchPersons({
          variables: {
            ...initialPersonFilter,
            filter: {
              ...initialPersonFilter?.filter,
              skip: (personDebounceCall + 1) * LIMIT,
            },
          },
        });
      }
    }, 500);
    personDebounce();
  };

  const handlePersonSearch = (search) => {
    setPersonSearch(true);
    setPersonSearchTerm(search);
    if (search) {
      setPersonLoading(true);
      fetchPersons({
        variables: {
          ...initialPersonFilter,
          filter: {
            ...initialPersonFilter?.filter,
            searchTerm: trim(search),
          },
        },
      });
    } else {
      setPersonLoading(false);
      fetchPersons({
        variables: {
          ...initialPersonFilter,
          filter: {
            ...initialPersonFilter?.filter,
            searchTerm: search,
          },
        },
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncePersonSearch = useCallback(
    debounce(handlePersonSearch, 1000),
    [],
  );

  const handlePersonSelect = () => {
    setIsPersonEnd(false);
    setPersonSearch(false);
    fetchPersons({
      variables: initialPersonFilter,
    });
  };

  useEffect(() => {
    if (editData) {
      creditsForm?.setFieldsValue({
        credits: [
          {
            ...editData,
            person: {
              label: editData?.person?.name,
              value: editData?.person?.name,
            },
          },
        ],
      });
    }
  }, [editData]);

  const handleoK = () => {
    creditsForm?.validateFields()?.then(() => {
      const getCredits = creditsForm?.getFieldsValue('credits');
      let newCredits = [];
      if (editData) {
        const index = findIndex(
          creditsData,
          (item) => item?.id === editData?.id,
        );
        const cloneCredits = cloneDeep(creditsData);
        newCredits = map(getCredits?.credits, (credit) => ({
          ...credit,
          person: selectedPerson[index],
        }));
        cloneCredits[index] = newCredits?.[0];
        setCreditsData(cloneCredits);
      } else {
        newCredits = map(getCredits?.credits, (credit, index) => ({
          ...credit,
          person: selectedPerson[index],
          id: uniqueId(),
        }));
        setCreditsData(uniqBy([...creditsData, ...newCredits]), 'id');
      }
      setShowModal(false);
      creditsForm?.resetFields();
      setEditData(null);
    });
  };

  return (
    <Modal
      open={showModal}
      onCancel={onCancel}
      centered
      title={
        <div className="d-flex justify-end align-center">
          <div id="add-credit-btn" />
        </div>
      }
      closable={false}
      okText="Save"
      onOk={handleoK}
      width={820}
      wrapClassName="add-credit-modal"
      forceRender
    >
      <Form
        initialValues={{
          credits: [
            {
              character: undefined,
              characterAdult: undefined,
              characterGender: undefined,
              creditType: undefined,
              department: undefined,
              job: undefined,
            },
          ],
        }}
        name="creditsForm"
        form={creditsForm}
        layout="vertical"
        onValuesChange={handleShowPrompt}
      >
        <Form.List name="credits">
          {(fields, { add, remove }) => (
            <>
              {fields?.map((field, index) => (
                <Card
                  key={`${field?.name}-${field?.key}`}
                  className="mb-16"
                  type="inner"
                  title="Credit"
                  extra={
                    <Button
                      type="link"
                      danger
                      onClick={() => remove(field?.name)}
                    >
                      <DeleteOutlined />
                    </Button>
                  }
                >
                  <Col xs={24} lg={24} xl={24} key={field?.key}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name={[field?.name, 'creditType']}
                          fieldKey={[field?.fieldKey, 'creditType']}
                          label="Credit Type"
                          rules={[showModal && required]}
                        >
                          <Select
                            placeholder="Select credit type"
                            allowClear
                            autoFocus={fields?.length - 1 === index}
                          >
                            {map(CREDIT_TYPE, (type) => (
                              <Select.Option
                                key={type?.value}
                                value={type?.value}
                              >
                                {type?.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name={[field?.name, 'department']}
                          fieldKey={[field?.fieldKey, 'department']}
                          label="Department"
                        >
                          <Input allowClear placeholder="Enter department" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name={[field?.name, 'job']}
                          fieldKey={[field?.fieldKey, 'job']}
                          label="Job"
                        >
                          <Input allowClear placeholder="Enter job" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name={[field?.name, 'character']}
                          fieldKey={[field?.fieldKey, 'character']}
                          label="Character"
                        >
                          <Input allowClear placeholder="Enter character" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name={[field?.name, 'characterAdult']}
                          fieldKey={[field?.fieldKey, 'characterAdult']}
                          label="Character Adult"
                        >
                          <Radio.Group>
                            <Radio value>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name={[field?.name, 'characterGender']}
                          fieldKey={[field?.fieldKey, 'characterGender']}
                          label="Character Gender"
                        >
                          <Radio.Group>
                            {map(GENDER, (gender) => (
                              <Radio value={gender?.value}>
                                {gender?.name}
                              </Radio>
                            ))}
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name={[field?.name, 'person']}
                          fieldKey={[field?.fieldKey, 'person']}
                          label="Person"
                          rules={[showModal && required]}
                        >
                          <Select
                            showSearch
                            placeholder="Select person"
                            filterOption={false}
                            onSearch={debouncePersonSearch}
                            onPopupScroll={onPersonsScroll}
                            onSelect={handlePersonSelect}
                            loading={personLoading}
                            onChange={(e, values) => {
                              if (selectedPerson[index]) {
                                const newData = [...selectedPerson];
                                newData[index] = {
                                  ...(values.key && {
                                    id: values?.key,
                                    name: values?.children,
                                  }),
                                  ...(!values?.key && {
                                    name: values?.children || e[e?.length - 1],
                                  }),
                                };
                                setSelectedPerson(uniq(newData));
                              } else {
                                setSelectedPerson(
                                  uniq([
                                    ...selectedPerson,
                                    {
                                      ...(values.key && {
                                        id: values?.key,
                                        name: values?.children,
                                      }),
                                      ...(!values?.key && {
                                        name:
                                          values?.children || e[e?.length - 1],
                                      }),
                                    },
                                  ]),
                                );
                              }
                            }}
                          >
                            {map(persons, (person) => (
                              <Select.Option
                                key={person?.id}
                                value={person?.name}
                              >
                                {person?.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Card>
              ))}
              {!editData && (
                <Portal portalId="add-credit-btn">
                  <Button type="primary" onClick={add} icon={<PlusOutlined />}>
                    Add More
                  </Button>
                </Portal>
              )}
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AddCreditModal;
