'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { nanoid } from 'nanoid';

type ProCon = { id: string; content: string };

type Option = {
    id: string; // Changed to string to match prop
    title: string;
    pros: ProCon[]; // Updated to array of objects
    cons: ProCon[]; // Updated to array of objects
};

interface Decision {
    id: string;
    title: string;
    labelAuto: boolean;
    userDecision: string | null;
    status: 'Pending' | 'InProgress' | 'Completed';
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    options: Option[];
}

export default function EditDecision({ decision }: { decision: Decision }) {

    const [decisionId, setDecisionId] = useState<string | null>()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState<string | null>('');
    const [status, setStatus] = useState('Pending');
    const [options, setOptions] = useState<Option[]>([]); // Initialize as an empty array

    useEffect(() => {
        console.log(decision);
        setDecisionId(decision.id)
        setTitle(decision.title);
        setDescription(decision.userDecision);
        setStatus(decision.status);
        setOptions(decision.options.map(option => ({
            id: option.id,
            title: option.title,
            pros: option.pros.map(pro => ({ ...pro })),
            cons: option.cons.map(con => ({ ...con })),
        })));
    }, [decision]);

    // const userId = useSession().data?.user.id;

    // Option handlers
    const addOption = () => setOptions([...options, { id: nanoid(), title: '', pros: [], cons: [] }]);
    const removeOption = (index: number) => setOptions(options.filter((_, i) => i !== index));
    const updateOption = (index: number, field: keyof Omit<Option, 'pros' | 'cons'>, value: string) => {
        const updated: any = [...options];
        updated[index][field] = value;
        setOptions(updated);
    };

    // List item handlers (pros/cons)
    const updateListItem = (optionIndex: number, type: 'pros' | 'cons', listIndex: number, value: string) => {
        const updated = [...options];
        updated[optionIndex][type][listIndex].content = value;
        setOptions(updated);
    };

    const addListItem = (optionIndex: number, type: 'pros' | 'cons') => {
        const updated = [...options];
        updated[optionIndex][type].push({ id: nanoid(), content: '' });
        setOptions(updated);
    };

    const removeListItem = (optionIndex: number, type: 'pros' | 'cons', listIndex: number) => {
        const updated = [...options];
        updated[optionIndex][type] = updated[optionIndex][type].filter((_, i) => i !== listIndex);
        setOptions(updated);
    };

    const handleSubmit = async () => {
        const decisionData = { id: decisionId, title, description, options, status };
        console.log("Frontend decision", decisionData);
        try {
            const res = await fetch('/api/decision/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ decision: decisionData }),
            });
            const resData = await res.json();
            if (!res.ok) {
                alert(`Error: ${resData.message}`);
            } else {
                alert('Decision updated!');
            }
        } catch (error) {
            console.error('Error submitting decision:', error);
            alert('Error submitting decision. Please try again.');
            return;
        }
    };


    return (
        <Card className="p-6">
            <div className="space-y-6">
                <div>
                    <Label className='mb-2'>Title</Label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Decision title"
                    />
                </div>

                <div>
                    <Label className='mb-2'>Decision</Label>
                    <Textarea
                        value={description || ""}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your decision"
                        rows={3}
                    />
                </div>

                {options.map((option, idx) => (
                    <Card key={option.id} className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium">Option {idx + 1}</h3>
                            {options.length > 1 && (
                                <Button variant="ghost" size="sm" onClick={() => removeOption(idx)}>
                                    <TrashIcon className="w-4 h-4" />
                                </Button>
                            )}
                        </div>

                        <Input
                            value={option.title}
                            onChange={(e) => updateOption(idx, 'title', e.target.value)}
                            placeholder="Option title"
                            className="mb-4"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className='mb-2'>Pros</Label>
                                <div className="space-y-2">
                                    {option.pros.map((pro, proIdx) => (
                                        <div key={pro.id} className="flex gap-2"> {/* Use pro.id as key */}
                                            <Input
                                                value={pro.content}
                                                onChange={(e) => updateListItem(idx, 'pros', proIdx, e.target.value)}
                                                placeholder={`Pro ${proIdx + 1}`}
                                            />
                                            {option.pros.length > 1 && (
                                                <Button variant="ghost" size="sm" onClick={() => removeListItem(idx, 'pros', proIdx)}>
                                                    <TrashIcon className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button variant="outline" size="sm" onClick={() => addListItem(idx, 'pros')}>
                                        <PlusIcon className="w-4 h-4 mr-2" /> Add Pro
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <Label className='mb-2'>Cons</Label>
                                <div className="space-y-2">
                                    {option.cons.map((con, conIdx) => (
                                        <div key={con.id} className="flex gap-2"> {/* Use con.id as key */}
                                            <Input
                                                value={con.content}
                                                onChange={(e) => updateListItem(idx, 'cons', conIdx, e.target.value)}
                                                placeholder={`Con ${conIdx + 1}`}
                                            />
                                            {option.cons.length > 1 && (
                                                <Button variant="ghost" size="sm" onClick={() => removeListItem(idx, 'cons', conIdx)}>
                                                    <TrashIcon className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button variant="outline" size="sm" onClick={() => addListItem(idx, 'cons')}>
                                        <PlusIcon className="w-4 h-4 mr-2" /> Add Con
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}

                <div className="flex gap-3">
                    <Button variant="outline" onClick={addOption}>
                        <PlusIcon className="w-4 h-4 mr-2" /> Add Option
                    </Button>
                    <div className="flex items-center gap-3">
                        <select
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-md p-2"
                            value={status} // Set the current status as the selected value
                        >
                            <option value="Pending">Pending</option>
                            <option value="InProgress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <Button onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </Card>
    );
}